import {Flex} from '@mantine/core';
import {
	MRT_ToggleFiltersButton,
	MRT_ToggleGlobalFilterButton
} from '../buttons';
import {type MRT_TableInstance} from '../types';

interface Props<TData extends Record<string, any> = {}> {
	table: MRT_TableInstance<TData>;
}

export const MRT_ToolbarFilterButtons = <
	TData extends Record<string, any> = {},
>({table,}: Props<TData>) => {
	const {
		options: {
			columnFilterDisplayMode,
			enableColumnFilters,
			enableFilters,
			enableGlobalFilter,
			initialState,
			renderToolbarInternalActions,
		},
	} = table;

	return (
		<Flex
			sx={{
				alignItems: 'center',
				gap: '2px',
				zIndex: 3,
			}}
		>
			{renderToolbarInternalActions?.({
				table,
			}) ?? (
				<>
					{enableFilters &&
						enableColumnFilters &&
						columnFilterDisplayMode !== 'popover' && (
							<MRT_ToggleFiltersButton table={table}/>
						)}
					{enableFilters &&
						enableGlobalFilter &&
						!initialState?.showGlobalFilter && (
							<MRT_ToggleGlobalFilterButton table={table}/>
						)}
				</>
			)}
		</Flex>
	);
};
