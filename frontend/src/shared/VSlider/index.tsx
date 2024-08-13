
import { CustomSlider } from "./CustomSlider";

type Props = {
    value?: number;
    handleSliderChange?: (_: Event, newValue: number | number[])=> void
};

const VSlider = ({ value, handleSliderChange }: Props) => {


    return (
        <CustomSlider
            size="small"
            defaultValue={value}
            aria-label="Small"
            valueLabelDisplay="auto"
            orientation="vertical"
            onChange={handleSliderChange}
            value={value}
        />
    );
};

export { VSlider };
