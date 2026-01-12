'use client'

interface ChatHeaderProps {
  onClose: () => void
}

export const ChatHeader = ({ onClose }: ChatHeaderProps) => (
  <div className="bg-red-600 text-white p-3 flex justify-between items-center font-semibold text-lg">
    <span>Чат підтримки</span>
    <button
      className="text-white text-xl font-bold hover:text-gray-200 transition"
      onClick={onClose}
    >
      ×
    </button>
  </div>
)
