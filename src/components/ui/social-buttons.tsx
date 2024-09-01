import { component$, type Component, type QRL } from "@builder.io/qwik";

type SocialButtonProps = {
  icon: Component<{}>;
  text: string;
  onClick$: QRL<() => void>;
  provider: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

export const SocialButton = component$((props: SocialButtonProps) => {
  return (
    <button
      type={props.type || "button"}
      onClick$={props.onClick$}
      disabled={props.disabled}
      aria-label={`Sign in with ${props.provider}`}
      class={`
        w-full bg-transparent border border-border
        hover:bg-bg-active focus:ring-2 focus:ring-offset-2 focus:ring-brand
        transition duration-300 text-white py-3 px-4 rounded-md
        flex items-center justify-center space-x-2
        ${props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <span class="sr-only">Sign in with {props.provider}</span>
      <props.icon />
      <span>{props.text}</span>
    </button>
  );
}); 
