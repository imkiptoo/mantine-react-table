import {type ActionIconProps, Button} from '@mantine/core';
import {type HTMLPropsRef, type MRT_TableInstance} from '../types';

interface Props<TData extends Record<string, any> = {}>
	extends ActionIconProps,
		HTMLPropsRef<HTMLButtonElement> {
	table: MRT_TableInstance<TData>;
}

export const MRT_ToggleFiltersButton = <
	TData extends Record<string, any> = {},
>({table, ...rest}: Props<TData>) => {
	const {
		getState,
		options: {
			icons: {IconFilter, IconFilterOff},
			localization,
		},
		setShowColumnFilters,
	} = table;
	const {showColumnFilters} = getState();

	const handleToggleShowFilters = () => {
		setShowColumnFilters(!showColumnFilters);
	};

	return (
		<Button
			leftSection={showColumnFilters ? <IconFilterOff size={16}/> : <IconFilter size={16}/>}
			variant="outline"
			aria-label={localization.showHideFilters}
			onClick={handleToggleShowFilters}
			{...rest}
			styles={{
				root: {
					height: "1.75rem",
				}
			}}
		>
			{!showColumnFilters ? "Show Filters" : "Hide Filters"}
		</Button>
	);
};
