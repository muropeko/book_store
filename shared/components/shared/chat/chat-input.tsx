import { Button, Textarea } from "@components/ui";

interface ChatInputProps {
  message: string;
  setMessage: (value: string) => void;
  onSend: () => void;
}

export const ChatInput = ({ message, setMessage, onSend }: ChatInputProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (message.trim() !== "") onSend();
    }
  };

  return (
    <div className="p-4 border-t flex items-center space-x-2 text-center">
      <Textarea
        placeholder="Відповісти..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button
        onClick={() => {
          if (message.trim() !== "") onSend();
        }}
      >
        Відправити
      </Button>
    </div>
  );
};
