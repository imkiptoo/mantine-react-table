import {type DragEvent, type ReactNode, useMemo} from 'react';
import {Box, Flex, type MantineTheme, useMantineTheme} from '@mantine/core';
import {MRT_ColumnActionMenu} from '../menus/MRT_ColumnActionMenu';
import {MRT_TableHeadCellFilterContainer} from './MRT_TableHeadCellFilterContainer';
import {MRT_TableHeadCellFilterLabel} from './MRT_TableHeadCellFilterLabel';
import {MRT_TableHeadCellGrabHandle} from './MRT_TableHeadCellGrabHandle';
import {MRT_TableHeadCellResizeHandle} from './MRT_TableHeadCellResizeHandle';
import {MRT_TableHeadCellSortLabel} from './MRT_TableHeadCellSortLabel';
import {getCommonCellStyles, getPrimaryColor} from '../column.utils';
import {type MRT_Header, type MRT_TableInstance} from '../types';

interface Props<TData extends Record<string, any> = {}> {
	header: MRT_Header<TData>;
	table: MRT_TableInstance<TData>;
}

export const MRT_TableHeadCell = <TData extends Record<string, any> = {}>({header, table,}: Props<TData>) => {
	const theme = useMantineTheme();
	const {
		getState,
		options: {
			enableColumnActions,
			enableColumnDragging,
			enableColumnOrdering,
			enableGrouping,
			enableMultiSort,
			layoutMode,
			mantineTableHeadCellProps,
		},
		refs: {tableHeadCellRefs},
		setHoveredColumn,
	} = table;
	const {/*density, */draggingColumn, grouping, hoveredColumn, showColumnFilters} = getState();
	const {column} = header;
	const {columnDef} = column;
	const {columnDefType} = columnDef;

	const mTableHeadCellProps =
		mantineTableHeadCellProps instanceof Function
			? mantineTableHeadCellProps({column, table})
			: mantineTableHeadCellProps;

	const mcTableHeadCellProps =
		columnDef.mantineTableHeadCellProps instanceof Function
			? columnDef.mantineTableHeadCellProps({column, table})
			: columnDef.mantineTableHeadCellProps;

	const tableCellProps = {
		...mTableHeadCellProps,
		...mcTableHeadCellProps,
	};

	const showColumnActions = (enableColumnActions || columnDef.enableColumnActions) && columnDef.enableColumnActions !== false;

	const showDragHandle = enableColumnDragging !== false && columnDef.enableColumnDragging && (enableColumnDragging || (enableColumnOrdering && columnDef.enableColumnOrdering) || (enableGrouping && columnDef.enableGrouping && !grouping.includes(column.id)));

	const headerPL = useMemo(() => {
		let pl = 0;
		if (column.getCanSort()) pl++;
		if (showColumnActions) pl += 1.75;
		if (showDragHandle) pl += 1.25;
		return pl;
	}, [showColumnActions, showDragHandle]);

	const draggingBorder = useMemo(
		() =>
			draggingColumn?.id === column.id
				? `1px dashed ${theme.colors.gray[7]} !important`
				: hoveredColumn?.id === column.id
					? `2px dashed ${getPrimaryColor(theme)} !important`
					: undefined,
		[draggingColumn, hoveredColumn],
	);

	const draggingBorders = draggingBorder
		? {
			borderLeft: draggingBorder,
			borderRight: draggingBorder,
			borderTop: draggingBorder,
		}
		: undefined;

	const handleDragEnter = (_e: DragEvent) => {
		if (enableGrouping && hoveredColumn?.id === 'drop-zone') {
			setHoveredColumn(null);
		}
		if (enableColumnOrdering && draggingColumn && columnDefType !== 'group') {
			setHoveredColumn(
				columnDef.enableColumnOrdering ? column : null,
			);
		}
	};

	const headerElement =
		columnDef?.Header instanceof Function
			? columnDef?.Header?.({
				column,
				header,
				table,
			})
			: columnDef?.Header ?? (columnDef.header as ReactNode);

	return (
		<Box
			component="th"
			align={columnDefType === 'group' ? 'center' : 'left'}
			colSpan={header.colSpan}
			onDragEnter={handleDragEnter}
			ref={(node: HTMLTableCellElement) => {
				if (node) {
					tableHeadCellRefs.current[column.id] = node;
				}
			}}
			{...tableCellProps}
			sx={(theme: MantineTheme) => ({
				flexDirection: layoutMode === 'grid' ? 'column' : undefined,
				fontWeight: 'bold',
				overflow: 'visible',
				userSelect: enableMultiSort && column.getCanSort() ? 'none' : undefined,
				verticalAlign: 'top',
				zIndex: column.getIsResizing() || draggingColumn?.id === column.id ? 3 : column.getIsPinned() && columnDefType !== 'group' ? 2 : 1,
				'&:hover .mantine-ActionIcon-root': {
					opacity: 1,
				},
				...getCommonCellStyles({
					column,
					header,
					table,
					tableCellProps,
					theme,
				}),
				...draggingBorders,
				padding: "0 !important",
			})}
		>
			{header.isPlaceholder ? null : (
				<Flex
					className="mantine-TableHeadCell-Content"
					sx={{
						alignItems: 'flex-start',
						flexDirection:
							tableCellProps?.align === 'right' ? 'row-reverse' : 'row',
						justifyContent:
							columnDefType === 'group' || tableCellProps?.align === 'center'
								? 'center'
								: column.getCanResize()
									? 'space-between'
									: 'flex-start',
						//: 'space-between',
						position: 'relative',
						width: '100%',
						":hover .headerChild": {
							visibility: "visible"
						},
						paddingLeft: "1rem",
						backgroundColor: theme.fn.rgba(
							theme.colorScheme === 'dark'
								? theme.fn.darken(theme.colors.dark[7], 0.02)
								: theme.fn.lighten(theme.colors.dark[8], 0.94),
							0.97,
						),
					}}
				>
					<Flex
						className="mantine-TableHeadCell-Content-Labels"
						onClick={column.getToggleSortingHandler()}
						sx={{
							alignItems: 'center',
							cursor: column.getCanSort() && columnDefType !== 'group' ? 'pointer' : undefined,
							flexDirection: tableCellProps?.align === 'right' ? 'row-reverse' : 'row',
							overflow: columnDefType === 'data' ? 'hidden' : undefined,
							paddingLeft: tableCellProps?.align === 'center' ? `${headerPL}rem` : undefined,
						}}
					>
						<Flex
							className="mantine-TableHeadCell-Content-Wrapper"
							sx={{
								overflow: columnDefType === 'data' ? 'hidden' : undefined,
								textOverflow: 'ellipsis',
								whiteSpace: (columnDef.header?.length ?? 0) < 20 ? 'nowrap' : 'normal',
								marginRight: ".5rem",
								alignItems: 'center',
								fontWeight: 500,
								color: column.getIsSorted() || column.getIsFiltered() ? getPrimaryColor(theme) : theme.fn.lighten(theme.colors.dark[9], 0.5),
								minHeight: "2rem",
							}}
							title={columnDefType === 'data' ? columnDef.header : undefined}
						>
							{headerElement}
						</Flex>
						{column.getCanSort() && (
							<Flex sx={{
								marginRight: ".25rem",
							}}>
								<MRT_TableHeadCellSortLabel header={header} table={table}/>
							</Flex>
						)}
						{column.getCanFilter() && (
							<MRT_TableHeadCellFilterLabel header={header} table={table}/>
						)}
					</Flex>
					{columnDefType !== 'group' && (
						<Flex
							className="mantine-TableHeadCell-Content-Actions headerChild"
							sx={{
								alignItems: 'center',
								alignSelf: 'center',
								whiteSpace: 'nowrap',
								visibility: "hidden"
							}}
						>
							{showDragHandle && (
								<MRT_TableHeadCellGrabHandle
									column={column}
									table={table}
									tableHeadCellRef={{
										current: tableHeadCellRefs.current[column.id],
									}}
								/>
							)}
							{showColumnActions && (
								<MRT_ColumnActionMenu header={header} table={table}/>
							)}
						</Flex>
					)}
					{column.getCanResize() && (
						<MRT_TableHeadCellResizeHandle header={header} table={table}/>
					)}
				</Flex>
			)}
			{(
				<Flex sx={{
					paddingLeft: "1rem",
					borderTop: showColumnFilters ? `1px solid ${theme.colors.gray[3]}` : undefined,
				}}>
					<MRT_TableHeadCellFilterContainer header={header} table={table}/>
				</Flex>
			)}
		</Box>
	);
};
