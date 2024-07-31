import { createClient, REALTIME_LISTEN_TYPES, REALTIME_SUBSCRIBE_STATES, RealtimeChannel } from "@supabase/supabase-js";
import { useState, useEffect, useRef, useCallback } from "react";
import { GameState } from "./models";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!)

enum Events {
    Ping = 'ping',
    PostState = 'post-state',
    RequestState = 'request-state',
}

enum ConnectionStatus {
    OFFLINE,
    ONLINE,
    OPP_PRESENT,
}

const useSupabase = (id: string) => {
    const [firstAnswerReceived, setFirstAnswerReceived] = useState(false);
    const [game, setGame] = useState<null | GameState>(null);
    const [status, setStatus] = useState<string>("starting");
    const channel = useRef<RealtimeChannel | null>(null);

    const broadcast = (event: Events, payload: any) => {
        channel.current?.send({
            type: REALTIME_LISTEN_TYPES.BROADCAST,
            event,
            payload,
        });
        console.log('broadcasted: ', event, payload);
    };

    const updateGame = (updatedGame: GameState) => {
        if (!game || game.clock < updatedGame.clock) {
            console.log("setting game from updateGame", updatedGame)
            setGame(updatedGame)
            if (firstAnswerReceived) {
                console.log("broadcasting update")
                broadcast(Events.PostState, updatedGame)
            }
        }
    };

    const receiveUpdatedStateThenUpdateOrBroadcast = useCallback((payload: any) => {
        console.log('payload', payload)
        console.log('current game', game)
        if (payload.payload && typeof payload.payload.clock === 'number') {
            if (!game || payload.payload.clock > game.clock) {
                console.log('setting game from broadcast', payload)
                setGame(payload.payload)
            } else if (payload.payload.clock < game.clock) {
                console.log('ignoring old game, broadcasting update')
                broadcast(Events.PostState, game)
            }
        } else {
            console.log('ignoring payload, rebroadcasting')
            broadcast(Events.PostState, game)
        }
        setFirstAnswerReceived(true)
    }, [game, broadcast])

    const broadcastCurrentState = useCallback((_: any) => {
        console.log('bCS current: ', game)
        if (game) {
            console.log('broadcasting current state', game)
            broadcast(Events.PostState, game);
        } else {
            console.log('no game to broadcast')
        }
    }, [game, broadcast])

    useEffect(() => {
        console.log('updating bindings', channel.current);
        const _channel = channel.current
        if (_channel) {
            _channel.bindings.broadcast = [
                { type: REALTIME_LISTEN_TYPES.BROADCAST, filter: { event: Events.PostState }, callback: receiveUpdatedStateThenUpdateOrBroadcast },
                { type: REALTIME_LISTEN_TYPES.BROADCAST, filter: { event: Events.RequestState }, callback: broadcastCurrentState },
            ]
        }
    }, [game, channel.current])

    useEffect(() => {
        if (channel.current && channel.current.subTopic == id) {
            console.log("channel already exists", id)
            return
        }
        console.log('useSupabase', id);

        channel.current = supabase.channel(id)
            .on(
                REALTIME_LISTEN_TYPES.BROADCAST,
                { event: Events.PostState },
                receiveUpdatedStateThenUpdateOrBroadcast
            )
            .on(
                REALTIME_LISTEN_TYPES.BROADCAST,
                { event: Events.RequestState },
                broadcastCurrentState
            )
            .subscribe(async (status) => {
                setStatus(status);
                if (status === REALTIME_SUBSCRIBE_STATES.SUBSCRIBED) {
                    broadcast(Events.RequestState, null);
                }
            })
    }, [id]);

    return { game, status, updateGame };
};

export default useSupabase;