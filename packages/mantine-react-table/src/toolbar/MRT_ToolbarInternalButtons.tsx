import {Flex} from '@mantine/core';
import {
	MRT_ToggleFullScreenButton,
	MRT_ShowHideColumnsButton,
	MRT_ToggleDensePaddingButton,
} from '../buttons';
import {type MRT_TableInstance} from '../types';

interface Props<TData extends Record<string, any> = {}> {
	table: MRT_TableInstance<TData>;
}

export const MRT_ToolbarInternalButtons = <
	TData extends Record<string, any> = {},
>({table,}: Props<TData>) => {
	const {
		options: {
			enableColumnOrdering,
			enableDensityToggle,
			enableFullScreenToggle,
			enableHiding,
			enablePinning,
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
					{(enableHiding || enableColumnOrdering || enablePinning) && (
						<MRT_ShowHideColumnsButton table={table}/>
					)}
					{enableDensityToggle && (
						<MRT_ToggleDensePaddingButton table={table}/>
					)}
					{enableFullScreenToggle && (
						<MRT_ToggleFullScreenButton table={table}/>
					)}
				</>
			)}
		</Flex>
	);
};
