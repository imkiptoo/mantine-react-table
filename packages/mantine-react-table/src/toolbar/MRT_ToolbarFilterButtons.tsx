import {Flex} from '@mantine/core';
import {
	MRT_ToggleFiltersButton,
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
			renderToolbarInternalActions,
		},
	} = table;

	return (
		<Flex
			sx={{
				alignItems: 'center',
				gap: '6px',
				zIndex: 3,
				paddingRight: "6px",
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
					{/*{enableFilters &&
						enableGlobalFilter &&
						!initialState?.showGlobalFilter && (
							<MRT_ToggleGlobalFilterButton table={table}/>
						)}*/}
				</>
			)}
		</Flex>
	);
};
