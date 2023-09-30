import {type ActionIconProps, Button} from '@mantine/core';
import {type HTMLPropsRef, type MRT_TableInstance} from '../types';
import {Icon} from "@iconify/react";

interface Props<TData extends Record<string, any> = {}> extends ActionIconProps, HTMLPropsRef<HTMLButtonElement> {
	table: MRT_TableInstance<TData>;
}

export const MRT_ToggleFiltersButton = <
	TData extends Record<string, any> = {},
>({table}: Props<TData>) => {
	const {
		getState,
		options: {
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
			leftIcon={showColumnFilters ?
				<Icon icon="fluent:filter-dismiss-24-regular" height={20} />
				:
				<Icon icon="fluent:filter-24-regular" height={20} />
			}
			variant={showColumnFilters ? "filled" : "default"}
			aria-label={localization.showHideFilters}
			onClick={handleToggleShowFilters}
			styles={{
				root: {
					height: "1.75rem",
				},
				label: {
					fontWeight: showColumnFilters ? 500 : 400,
				}
			}}
		>
			{!showColumnFilters ? "Show Filters" : "Hide Filters"}
		</Button>
	);
};
