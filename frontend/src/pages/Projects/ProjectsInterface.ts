interface IProjectProps {
    image: string;
    style: React.CSSProperties;
    setModalStatus: (e: boolean) => void;
}

export interface ISelectedBlockProps extends IProjectProps {
    setModalStatus: (status: boolean) => void;
}
