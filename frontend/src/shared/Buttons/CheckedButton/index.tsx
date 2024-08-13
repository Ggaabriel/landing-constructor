import { styled } from "@mui/material/styles";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { FormControlLabel, keyframes } from "@mui/material";

const IOSSwitch = styled((props: SwitchProps) => (
    <Switch
        focusVisibleClassName=".Mui-focusVisible"
        disableRipple
        {...props}
    />
))(({ theme, checked }) => {
    const fromDarkToLight = keyframes`
    from {
        filter: brightness(60%);
       
    }
    to {
         filter: brightness(100%);
   
    }
    
  `;
    const fromDarkToLightMini = keyframes`
  from {
      filter: brightness(80%);
     
  }
  to {
       filter: brightness(100%);
 
  }
  
  
`;
    const fromLightToDark = keyframes`
    from {
      
       filter: brightness(100%);
    }
    to {
           filter: brightness(60%);
   
    }
    
  `;
    const fromLightToDarkMini = keyframes`
      from {
        filter: brightness(100%);
      }
      to {     
        filter: brightness(80%);
      }
    `;
    return {
        width: 42,
        height: 26,
        padding: 0,
        "& .MuiSwitch-switchBase": {
            padding: 0,
            margin: 2,
            transitionDuration: "300ms",
            "&.Mui-checked": {
                transform: "translateX(16px)",
                color: "#fff",
                "& + .MuiSwitch-track": {
                    backgroundColor: "#383838",
                    opacity: 1,
                    border: 0,
                },
                "&.Mui-disabled + .MuiSwitch-track": {
                    opacity: 0.5,
                },
            },
            "&.Mui-focusVisible .MuiSwitch-thumb": {
                color: "#383838",
                border: "6px solid #fff",
            },
            "&.Mui-disabled .MuiSwitch-thumb": {
                color:
                    theme.palette.mode === "light"
                        ? theme.palette.grey[100]
                        : theme.palette.grey[600],
            },
            "&.Mui-disabled + .MuiSwitch-track": {
                opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
            },
        },
        "& .MuiSwitch-thumb": {
            boxSizing: "border-box",
            width: 22,
            height: 22,
            backgroundImage:
                "linear-gradient(to bottom right, #FFF2F2, #7F8484)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            filter: "brightness(60%)",
            animation: checked
                ? `${fromDarkToLight} 0.3s`
                : `${fromLightToDark} 0.3s`,
            animationFillMode: "forwards",
            ":after": {
                content: '""',
                display: "block",
                width: 18,
                height: 18,
                transform: "rotate(180deg)",
                borderRadius: 9999,
                backgroundImage:
                    "linear-gradient(to top left, #575959, #F8F8F8)",
                filter: "brightness(80%)",
                animation: checked
                    ? `${fromDarkToLightMini} 0.3s`
                    : `${fromLightToDarkMini} 0.3s`,
                animationFillMode: "forwards",
            },
        },
        "& .MuiSwitch-track": {
            borderRadius: 26 / 2,
            backgroundColor:
                theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
            boxShadow: "-1px 2px 4px 0px rgba(0, 0, 0, 0.25) inset",
            opacity: 1,
            transition: theme.transitions.create(["background-color"], {
                duration: 500,
            }),
        },
    };
});

type Props = {
    checked: boolean;
    setChecked?: () => void;
};
const CheckedButton = ({ checked, setChecked }: Props) => {
    return (
        <FormControlLabel
            onClick={setChecked}
            control={<IOSSwitch checked={checked} sx={{ m: 1 }} />}
            label=""
        />
    );
};
export { CheckedButton };
