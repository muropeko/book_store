'use client'

interface ChatInputProps {
  inputMessage: string
  setInputMessage: (msg: string) => void
  handleSend: () => void
}

export const ChatInput = ({ inputMessage, setInputMessage, handleSend }: ChatInputProps) => (
  <div className="p-4 border-t flex items-center gap-2 bg-white">
    <textarea
      className="flex-1 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 resize-none h-12"
      placeholder="Введіть текст..."
      value={inputMessage}
      onChange={(e) => setInputMessage(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          handleSend();
        }
      }}
    />
    <button
      className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition"
      onClick={handleSend}
    >
      Надіслати
    </button>
  </div>
);
