import AutorenewIcon from "@mui/icons-material/Autorenew";
import ArticleIcon from "@mui/icons-material/Article";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import GradientIcon from "@mui/icons-material/Gradient";
import FlipIcon from "@mui/icons-material/Flip";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { PATH } from "../constants/path";

export const menuArray = [
    {
        name: "Single PX to VW",
        url: PATH.home,
        icon: <AutorenewIcon />,
		disabled: false,
    },
    {
        name: "Text PX to VW",
        url: PATH.textConverter,
        icon: <ArticleIcon />,
		disabled: false,
    },
    {
        name: "Color Converter",
        url: PATH.colorConverter,
        icon: <ColorLensIcon />,
		disabled: false,
    },
    {
        name: "Shadow Generator",
        url: PATH.shadowGenerator,
        icon: <BlurOnIcon />,
		disabled: false,
    },
    {
        name: "Gradient Generator",
        url: PATH.gradientGenerator,
        icon: <GradientIcon />,
		disabled: false,
    },
    {
        name: "LTR/RTL Convertor",
        url: PATH.ltrRtlConvertor,
        icon: <FlipIcon />,
		disabled: true,
    },
    {
        name: "Ratio Calculator",
        url: PATH.ratioCalculator,
        icon: <AspectRatioIcon />,
		disabled: true,
    },
    {
        name: "Regex Builder",
        url: PATH.regexBuilder,
        icon: <AutoFixHighIcon />,
		disabled: true,
    },
];