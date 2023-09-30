import {type ActionIconProps, Button} from '@mantine/core';
import {type HTMLPropsRef, type MRT_TableInstance} from '../types';
import {Icon} from "@iconify/react";

interface Props<TData extends Record<string, any> = {}>
	extends ActionIconProps,
		HTMLPropsRef<HTMLButtonElement> {
	table: MRT_TableInstance<TData>;
}

export const MRT_ToggleFullScreenButton = <
	TData extends Record<string, any> = {},
>({table, ...rest}: Props<TData>) => {
	const {
		getState,
		options: {
			localization,
		},
		setIsFullScreen,
	} = table;
	const {isFullScreen} = getState();

	const handleToggleFullScreen = () => {
		setIsFullScreen(!isFullScreen);
	};

	return (
		<Button
			variant={"default"}
			aria-label={localization.toggleFullScreen}
			onClick={handleToggleFullScreen}
			rightIcon={<Icon icon={!isFullScreen ? "fluent:full-screen-maximize-16-regular" : "fluent:full-screen-minimize-16-regular"} height={16} />}
			styles={{
				root: {
					height: "1.75rem",
				},
				label: {
					fontWeight: 400,
				}
			}}
		>
			{rest?.title ?? localization.toggleFullScreen}
		</Button>
	);
};
