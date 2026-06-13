export function CaretIcon({ className = "hero__nav-caret" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      height="1em"
      viewBox="0 0 32 32"
      width="1em"
    >
      <path
        d="M16 22 6 12l1.4-1.4 8.6 8.6 8.6-8.6L26 12z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ArrowIcon({ className = "btn__arrow" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      focusable="false"
      viewBox="0 0 16 16"
    >
      <path
        d="M6.3333 3.66665H12.3333V9.66665"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.33333"
      />
      <path
        d="M3.848 12.152L12.3333 3.66665"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.33333"
      />
    </svg>
  );
}

export function CheckIcon({ className = "terminal__copy-icon terminal__copy-icon--check" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      focusable="false"
      viewBox="0 0 18 18"
    >
      <path
        d="M4 9.5 L7.5 13 L14 5.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
