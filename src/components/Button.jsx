// eslint-disable-next-line react/prop-types
export default function Button({children, ...rest}) {
    return <button {...rest}>{children}</button>;
}