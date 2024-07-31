export const ShareBubble: React.FC = () => {
  return (
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] z-50 sm:hidden"
      onClick={() => navigator.share({ title: "Let's play a game..." })}
    >
      <div className="bg-primary text-primary-foreground rounded-lg p-4 relative">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-lg text-primary-foreground/80 text-center">
              Tap here to share your game link with a friend.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}