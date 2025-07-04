// import React from "react";
// import PropTypes from "prop-types";
// import { cva } from "class-variance-authority";
// import { cn } from "../../utils/cn";

// const buttonVariants = cva(
//     "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
//     {
//         variants: {
//             variant: {
//                 default: "bg-blue-600 text-white hover:bg-blue-600/90",
//                 destructive: "bg-red-500 text-white hover:bg-red-500/90",
//                 outline:
//                     "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
//                 secondary: "bg-gray-200 text-secondary-foreground hover:bg-gray-200/80",
//                 ghost: "hover:bg-accent hover:text-accent-foreground",
//                 link: "text-primary underline-offset-4 hover:underline",
//             },
//             size: {
//                 default: "h-10 px-4 py-2",
//                 sm: "h-9 rounded-md px-3",
//                 lg: "h-11 rounded-md px-8",
//                 icon: "h-10 w-10",
//             },
//         },
//         defaultVariants: {
//             variant: "default",
//             size: "default",
//         },
//     }
// );

// const Button = React.forwardRef(
//     ({ className, variant, size, ...props }, ref) => {
//         return (
//             <button
//                 className={cn(buttonVariants({ variant, size, className }))}
//                 ref={ref}
//                 {...props}
//             />
//         );
//     }
// );
// Button.displayName = "Button";

// Button.propTypes = {
//     className: PropTypes.string,
//     variant: PropTypes.oneOf([
//         "default",
//         "destructive",
//         "outline",
//         "secondary",
//         "ghost",
//         "link",
//     ]),
//     size: PropTypes.oneOf(["default", "sm", "lg", "icon"]),
// };

// export { Button };

import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

const Button = React.forwardRef(({
    className,
    variant = 'primary',
    size = 'md',
    disabled = false,
    children,
    ...props
}, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
        outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
        ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
        success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
    };

    const classes = cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
    );

    return (
        <button
            ref={ref}
            className={classes}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
});

Button.displayName = 'Button';

Button.propTypes = {
    className: PropTypes.string,
    variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost', 'danger', 'success']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    disabled: PropTypes.bool,
    children: PropTypes.node.isRequired,
};

export { Button };