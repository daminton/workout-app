import { SettingsButton } from "./SettingsButton";
import { SettingsLabel } from "./SettingsLabel";

export default function SettingsItem({ children, screenReaderAlt, label, onClick }) {
  return (
    <div className="w-full flex flex-col items-center" onClick={onClick}>
      {label && <SettingsLabel label={label} />}
      <SettingsButton screenReaderAlt={screenReaderAlt}>
        {children}
        {screenReaderAlt && <span className="sr-only">{screenReaderAlt}</span>}
      </SettingsButton>
    </div>
  )
}