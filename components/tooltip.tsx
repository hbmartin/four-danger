interface TooltipProps {
  message: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ message }) => {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] z-50 sm:hidden">
      <div className="bg-primary text-primary-foreground rounded-lg p-4 relative">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="text-lg font-medium text-center">¡Importante!</h4>
            <p className="text-lg text-primary-foreground/80">
              {message}
            </p>
          </div>
        </div>
        <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-t-[10px] border-t-primary border-x-[10px] border-x-transparent" />
      </div>
    </div>
  )
}