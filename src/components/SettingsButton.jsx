import { Button } from "./ui/button"

export function SettingsButton({ children, screenReaderAlt, onClick }) {
  return (
    <Button variant="outline" size="icon" className="w-full flex-row" onClick={onClick}>
      {children}
      {screenReaderAlt && <span className="sr-only">{screenReaderAlt}</span>}
    </Button>
  )
}