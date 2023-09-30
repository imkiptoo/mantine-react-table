import {Fragment} from 'react';
import {ActionIcon, Alert, Badge, Collapse, Flex, Stack} from '@mantine/core';
import {type MRT_TableInstance} from '../types';
import {MRT_SelectCheckbox} from '../inputs';

interface Props<TData extends Record<string, any> = {}> {
	stackAlertBanner?: boolean;
	table: MRT_TableInstance<TData>;
}

export const MRT_ToolbarAlertBanner = <TData extends Record<string, any> = {}>({stackAlertBanner, table,}: Props<TData>) => {
	const {
		getPrePaginationRowModel,
		getSelectedRowModel,
		getState,
		options: {
			enableRowSelection,
			enableSelectAll,
			icons: {IconX},
			localization,
			mantineToolbarAlertBannerBadgeProps,
			mantineToolbarAlertBannerProps,
			positionToolbarAlertBanner,
			renderToolbarAlertBannerContent,
			rowCount,
		},
	} = table;
	const {grouping, showAlertBanner} = getState();

	const alertProps =
		mantineToolbarAlertBannerProps instanceof Function
			? mantineToolbarAlertBannerProps({table})
			: mantineToolbarAlertBannerProps;

	const badgeProps =
		mantineToolbarAlertBannerBadgeProps instanceof Function
			? mantineToolbarAlertBannerBadgeProps({table})
			: mantineToolbarAlertBannerBadgeProps;

	const selectedAlert =
		getSelectedRowModel().rows.length > 0
			? localization.selectedCountOfRowCountRowsSelected
				?.replace(
					'{selectedCount}',
					getSelectedRowModel().rows.length.toString(),
				)
				?.replace(
					'{rowCount}',
					(rowCount ?? getPrePaginationRowModel().rows.length).toString(),
				)
			: null;

	const groupedAlert =
		grouping.length > 0 ? (
			<Flex
				sx={{
					alignItems: "center",
					display: "flex",
				}}
			>
				{localization.groupedBy}{' '}
				{grouping.map((columnId, index) => (
					<Fragment key={`${index}-${columnId}`}>
						{index > 0 ? localization.thenBy : ''}
						<Badge
							radius={4}
							rightSection={
								<ActionIcon
									onClick={() => table.getColumn(columnId).toggleGrouping()}
									size="xs" color="blue" radius="xl" variant="transparent"
								>
									<IconX/>
								</ActionIcon>
							}
							sx={{marginLeft: '1ch'}}
							variant="outline"
							{...badgeProps}
						>
							{table.getColumn(columnId).columnDef.header}{' '}
						</Badge>
					</Fragment>
				))}
			</Flex>
		) : null;

	return (
		<Collapse
			in={showAlertBanner || !!selectedAlert || !!groupedAlert}
			transitionDuration={stackAlertBanner ? 200 : 0}
		>
			<Alert
				color="blue"
				icon={false}
				{...alertProps}
				sx={(theme) => ({
					borderRadius: 0,
					left: 0,
					position: 'relative',
					right: 0,
					top: 0,
					width: '100%',
					padding: "0 1rem",
					alignItems: "center",
					display: "flex",
					borderBottom: `1px solid ${theme.colors.gray[theme.colorScheme === 'dark' ? 8 : 3]}`,
					zIndex: 2,
					minHeight: "2.5rem",
					...(alertProps?.sx instanceof Function
						? alertProps.sx(theme)
						: (alertProps?.sx as any)),
				})}
			>
				{renderToolbarAlertBannerContent?.({
					groupedAlert,
					selectedAlert,
					table,
				}) ?? (
					<Flex
						sx={{
							gap: '12px',
							alignItems: "center",
							display: "flex",
						}}
					>
						{enableRowSelection &&
							enableSelectAll &&
							positionToolbarAlertBanner === 'head-overlay' && (
								<MRT_SelectCheckbox selectAll table={table}/>
							)}
						<Stack>
							{alertProps?.children}
							{alertProps?.children && (selectedAlert || groupedAlert) && (
								<br/>
							)}
							{selectedAlert}
							{selectedAlert && groupedAlert && <br/>}
							{groupedAlert}
						</Stack>
					</Flex>
				)}
			</Alert>
		</Collapse>
	);
};
