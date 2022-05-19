import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getColorName } from "../../helpers/colorLists";

interface propsType {
	calculatedHEX: string;
	isWhiteText: boolean;
}

function ColorNameBlock({ calculatedHEX, isWhiteText }: propsType) {
	const [calculatedColorName, setCalculatedColorName] = useState<string>("");

	useEffect(() => {
		if (calculatedHEX) {
			const colorInfo = getColorName(calculatedHEX);

			//@ts-ignore
			setCalculatedColorName(colorInfo.name);
		}
	}, [calculatedHEX]);
	return (
		<>
			<Box
				p={2}
				sx={{
					backgroundColor: calculatedHEX,
					color: isWhiteText ? "white" : "black",
				}}
			>
				<Box p={1}>Color Name: [{calculatedColorName}]</Box>
				<Box p={1}>$color{calculatedColorName.replace(/ /g, "")}</Box>
			</Box>
		</>
	);
}

export default ColorNameBlock;
