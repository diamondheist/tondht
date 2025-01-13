'use client';

interface ClaimButtonProps {
  onClick: () => void | Promise<void>;
  text?: string;
  disabled?: boolean;
}

const ClaimButton: React.FC<ClaimButtonProps> = ({
  onClick,
  text = "Button Text",
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`box-border relative inline-flex items-center justify-center w-full px-6 py-2 overflow-hidden font-semibold text-white text-sm transition-all duration-300 rounded-full cursor-pointer group ring-offset-2 ring-1 ${
        disabled
          ? 'bg-gray-400 ring-gray-300 ring-offset-gray-200 cursor-not-allowed'
          : 'bg-blue-600 ring-blue-300 ring-offset-blue-200 hover:ring-offset-blue-500'
      } ease focus:outline-none`}
    >
      {text}
    </button>
  );
};

export default ClaimButton;

