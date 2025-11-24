"use client";

type ModalLayoutProps = {
  isOpen: boolean;
  onClose: any;
  children: React.ReactNode;
  widthClass?: string;
  havePreStyled?: boolean; // ⬅ added
};

export default function ModalLayout({
  isOpen,
  onClose,
  children,
  widthClass = "max-w-lg",
  havePreStyled = true, // default keeps old behavior
}: ModalLayoutProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-300 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      {havePreStyled ? (
        // -------------------------
        // PRE-STYLED VERSION
        // -------------------------
        <div
          className={`relative bg-gradient-to-br from-gray-800 via-gray-900 to-stone-700 text-gray-100 rounded-2xl w-full ${widthClass} p-8 shadow-2xl border border-gray-700`}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-4xl font-bold transition"
          >
            &times;
          </button>

          {children}
        </div>
      ) : (
        // -------------------------
        // MINIMAL VERSION (ONLY CHILDREN + BLUR BACKDROP)
        // -------------------------
        <div className="relative w-full flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}

// Reusable UI Components based on your ModalLayout styling

// -------------------------
// Label Component
// -------------------------
export const Label = ({
  htmlFor,
  children,
}: {
  htmlFor?: string;
  children: React.ReactNode;
}) => (
  <label
    htmlFor={htmlFor}
    className="block text-gray-300 text-sm font-medium mb-1"
  >
    {children}
  </label>
);

// -------------------------
// Input Component
// -------------------------
export const Input = ({
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className={`bg-gray-900 border border-gray-700 text-gray-100 placeholder-gray-400 p-3 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none w-full ${
      props.className ?? ""
    }`}
  />
);

// -------------------------
// Button Component
// -------------------------
export const Button = ({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...props}
    className={`bg-gradient-to-br from-blue-500 to-blue-800 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-900 active:scale-95 transition disabled:opacity-50 w-full ${
      props.className ?? ""
    }`}
  >
    {children}
  </button>
);

// -------------------------
// FormGroup Component (Label + Input wrapper)
// -------------------------
export const FormGroup = ({
  label,
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-1 mb-3">
    {label && <Label>{label}</Label>}
    {children}
  </div>
);

// -------------------------
// Select Component
// -------------------------
export const Select = ({
  options = [],
  value,
  onChange,
  className,
}: {
  options: { label: string; value: string }[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}) => (
  <select
    value={value}
    onChange={(e) => onChange?.(e.target.value)}
    className={`bg-gray-900 border border-gray-700 text-gray-100 p-3 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none w-full ${
      className ?? ""
    }`}
  >
    {options.map((opt) => (
      <option
        key={opt.value}
        value={opt.value}
        className="bg-gray-900 text-gray-100"
      >
        {opt.label}
      </option>
    ))}
  </select>
);

// -------------------------
// Example usage inside ModalLayout
// -------------------------
// <ModalLayout isOpen={isOpen} onClose={onClose}>
//   <FormGroup label="Username">
//     <Input placeholder="Enter username" />
//   </FormGroup>
//
//   <FormGroup label="Password">
//     <Input type="password" placeholder="Password" />
//   </FormGroup>
//
//   <Button>Submit</Button>
// </ModalLayout>
