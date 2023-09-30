import {type ActionIconProps, Button} from '@mantine/core';
import {type HTMLPropsRef, type MRT_TableInstance} from '../types';
import { Icon } from '@iconify/react';

interface Props<TData extends Record<string, any> = {}>
	extends ActionIconProps,
		HTMLPropsRef<HTMLButtonElement> {
	table: MRT_TableInstance<TData>;
}

const sizes = ['xs', 'md', 'xl'] as const;

export const MRT_ToggleDensePaddingButton = <
	TData extends Record<string, any> = {},
>({table}: Props<TData>) => {
	const {
		getState,
		options: {
			localization,
		},
		setDensity,
	} = table;
	const {density} = getState();

	const handleToggleDensePadding = () => {
		setDensity(sizes[(sizes.indexOf(density) - 1) % sizes.length] ?? 'xl');
	};

	return (
		<Button.Group>
			<Button
				variant={"default"}
				aria-label={localization.showHideFilters}
				onClick={handleToggleDensePadding}
				rightIcon={<Icon icon="fluent:auto-fit-height-24-regular" height={16} />}
				styles={{
					root: {
						height: "1.75rem",
					},
					label: {
						fontWeight: 400,
					}
				}}
			>
				Density
			</Button>
			{/*<Button
				variant="default"
				styles={{
					root: {
						height: "1.75rem",
					},
					label: {
						fontWeight: 400,
					}
				}}
			>
				{density.toUpperCase()}
			</Button>*/}
		</Button.Group>
	);
};
