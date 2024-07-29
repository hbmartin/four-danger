import { useEffect, useState } from "react";
import { useCurrentGameStore } from "./local-hook";
import useSupabase from "./supabase-hook";
import { REALTIME_SUBSCRIBE_STATES } from "@supabase/supabase-js";
import { GameState } from "./models";

const useSync = (id: string) => {
    const [connected, setConnected] = useState<boolean>(false);
    const [game, setGame] = useState<GameState | null>(null);

    const supabase = useSupabase(id);
    const _local = useCurrentGameStore(id)
    const local = _local();

    const placePiece = (index: number) => {
        local?.placePiece?.(index)
    }
    const handPiece = (piece: number) => {
        local?.handPiece?.(piece);
    }
    const joinGame = (user: string) => {
        local?.joinGame?.(user);
    }

    _local.persist.onFinishHydration(() => {
        console.log('onFinishHydration')
        if (!local.game && supabase.game) {
            local.setGame(supabase.game);
            setGame(local.game);
        }
    })

    useEffect(() => {
        console.log('supabase.game', supabase.game);
        console.log('local.game', local.game);
        if (local.game && !supabase.game) {
            console.log('local game is set, but supabase game is not')
            supabase.updateGame(local.game);
        } else if (!local.game && _local.persist.hasHydrated() && supabase.game) {
            console.log('local game is not set, but supabase game is')
            local.setGame(supabase.game);
        } else if (local.game &&  supabase.game) {
            if (local.game.clock > supabase.game.clock) {
                console.log('local game is newer')
                setGame(local.game);
                supabase.updateGame(local.game);
            } else if (local.game.clock < supabase.game.clock) {
                console.log('supabase game is newer')
                setGame(supabase.game);
                local.setGame(supabase.game);
            } else {
                console.log('local game is same as supabase')
                setGame(local.game);
            }
        }
    }, [supabase.game, local.game, supabase.game?.clock, local.game?.clock]);


    useEffect(() => {
        console.log('supabase.status', supabase.status);
        setConnected(supabase.status === REALTIME_SUBSCRIBE_STATES.SUBSCRIBED);
    }, [supabase.status]);

    return { game, connected, placePiece, handPiece, joinGame };
}

export default useSync;