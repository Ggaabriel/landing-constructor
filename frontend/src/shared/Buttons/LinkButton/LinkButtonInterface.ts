export interface ILinkButtonProps {
    title: string | undefined;
    buttonActive: boolean;
    handleClick?: () => void;
    link: string;
}
