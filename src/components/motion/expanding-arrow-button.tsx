import { ChevronRight } from "lucide-react";
import {
  SharedDialogContent,
  SharedDialogItem,
  SharedDialogOnly,
  SharedDialogRoot,
  SharedDialogTrigger,
  SharedDialogCloseButton,
} from "@ursa/ursa-design";
import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
} from "motion/react";
import {
  forwardRef,
  useState,
  type FocusEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import { EASE_OUT, SPRING_LAYOUT, SPRING_PRESS } from "@/lib/ease";
import { useHoverCapable } from "@/lib/hooks/use-hover-capable";
import { cn } from "@/lib/utils";

export interface ExpandingArrowButtonProps extends Omit<
  HTMLMotionProps<"button">,
  "children"
> {
  children: ReactNode;
  accentClassName?: string;
  labelClassName?: string;
}

const ICON_OPACITY = [1, 0.78, 0.54, 0.32, 0.16] as const;



export const ExpandingArrowButton = forwardRef<
  HTMLButtonElement,
  ExpandingArrowButtonProps
>(function ExpandingCartButton(
  {

    children,
    className,
    accentClassName,
    labelClassName,
    disabled,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    ...rest
  },
  ref,
) {
  const reduce = useReducedMotion();
  const canHover = useHoverCapable();
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const active = !disabled && ((canHover && hovered) || focused);
  const layoutTransition = reduce ? { duration: 0 } : SPRING_LAYOUT;

  const handleMouseEnter = (event: MouseEvent<HTMLButtonElement>) => {
    setHovered(true);
    onMouseEnter?.(event);
  };

  const handleMouseLeave = (event: MouseEvent<HTMLButtonElement>) => {
    setHovered(false);
    onMouseLeave?.(event);
  };

  const handleFocus = (event: FocusEvent<HTMLButtonElement>) => {
    setFocused(true);
    onFocus?.(event);
  };

  const handleBlur = (event: FocusEvent<HTMLButtonElement>) => {
    setFocused(false);
    onBlur?.(event);
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      whileTap={reduce || disabled ? undefined : { scale: 0.97 }}
      transition={SPRING_PRESS}
      className={cn(
        "relative inline-flex cursor-pointer h-16 max-w-72 items-center overflow-hidden rounded-[22px] bg-linear-to-r from-black/30 to-transparent p-1.5 text-white select-none",
        "outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...rest}
    >
      <motion.span
        layout="size"
        aria-hidden="true"
        transition={layoutTransition}
        style={{
          width: active ? "calc(100% - 12px)" : 52,
          borderRadius: 16,
        }}
        className={cn(
          "absolute inset-y-1.5 left-1.5 z-10 overflow-hidden bg-primary text-neutral-950",
          accentClassName,
        )}
      >
        <motion.span
          animate={{ opacity: active ? 0 : 1 }}
          transition={{ duration: reduce ? 0 : 0.1, ease: EASE_OUT }}
          className="absolute inset-0 grid place-items-center"
        >
          <SharedDialogItem id="button-icon" dialogId="quote-project">
            <ChevronRight className="h-7 w-5" />
          </SharedDialogItem>
        </motion.span>

        <span className="absolute inset-0 flex items-center justify-around px-3">
          {ICON_OPACITY.map((opacity, index) => (
            <motion.span
              key={opacity}
              animate={{
                opacity: active ? 1 : 0,
                transform:
                  active && !reduce ? "translateX(0px)" : "translateX(-6px)",
              }}
              transition={{
                duration: reduce ? 0 : 0.18,
                delay: active && !reduce ? 0.04 + index * 0.025 : 0,
                ease: EASE_OUT,
              }}
              style={{ color: `rgb(10 10 10 / ${opacity})` }}
              className="inline-grid place-items-center"
            >
              <ChevronRight className="h-7 w-5" />
            </motion.span>
          ))}
        </span>
      </motion.span>

      <motion.span
        animate={{
          opacity: active ? 0 : 1,
          transform:
            active && !reduce ? "translateX(6px)" : "translateX(0px)",
        }}
        transition={{ duration: reduce ? 0 : 0.12, ease: EASE_OUT }}
        className={cn(
          "relative z-0 ml-19 mr-5 whitespace-nowrap text-lg font-medium tracking-[-0.02em] inline-flex items-center gap-3",
          labelClassName,
        )}
      >
        <SharedDialogItem id="button-text" dialogId="quote-project" >

          {children}
        </SharedDialogItem>
      </motion.span>
    </motion.button>
  );
});
