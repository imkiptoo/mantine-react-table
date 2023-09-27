import { ActionIcon, Menu, Tooltip } from '@mantine/core';
import { type MRT_Header, type MRT_TableInstance } from '../types';
import {IconChevronDown} from "@tabler/icons-react";

interface Props<TData extends Record<string, any> = {}> {
  header: MRT_Header<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_ColumnActionMenu = <TData extends Record<string, any> = {}>({
  header,
  table,
}: Props<TData>) => {
  const {
    getState,
    toggleAllColumnsVisible,
    setColumnOrder,
    options: {
      columnFilterDisplayMode,
      enableColumnFilters,
      enableColumnResizing,
      enableGrouping,
      enableHiding,
      enablePinning,
      enableSorting,
      enableSortingRemoval,
      icons: {
        IconArrowAutofitContent,
        IconBoxMultiple,
        IconClearAll,
        IconColumns,
        IconEyeOff,
        IconFilter,
        IconFilterOff,
        IconPinned,
        IconPinnedOff,
        IconSortAscending,
        IconSortDescending,
      },
      localization,
      mantineColumnActionsButtonProps,
      renderColumnActionsMenuItems,
    },
    refs: { filterInputRefs },
    setColumnSizingInfo,
    setShowColumnFilters,
  } = table;
  const { column } = header;
  const { columnDef } = column;
  const { columnSizing, columnVisibility } = getState();

  const mTableHeadCellColumnActionsButtonProps =
    mantineColumnActionsButtonProps instanceof Function
      ? mantineColumnActionsButtonProps({ column, table })
      : mantineColumnActionsButtonProps;

  const mcTableHeadCellColumnActionsButtonProps =
    columnDef.mantineColumnActionsButtonProps instanceof Function
      ? columnDef.mantineColumnActionsButtonProps({
          column,
          table,
        })
      : columnDef.mantineColumnActionsButtonProps;

  const actionIconProps = {
    ...mTableHeadCellColumnActionsButtonProps,
    ...mcTableHeadCellColumnActionsButtonProps,
  };

  const handleClearSort = () => {
    column.clearSorting();
  };

  const handleSortAsc = () => {
    column.toggleSorting(false);
  };

  const handleSortDesc = () => {
    column.toggleSorting(true);
  };

  const handleResetColumnSize = () => {
    setColumnSizingInfo((old) => ({ ...old, isResizingColumn: false }));
    column.resetSize();
  };

  const handleHideColumn = () => {
    column.toggleVisibility(false);
  };

  const handlePinColumn = (pinDirection: 'left' | 'right' | false) => {
    column.pin(pinDirection);
  };

  const handleGroupByColumn = () => {
    column.toggleGrouping();
    setColumnOrder((old: any) => ['mrt-row-expand', ...old]);
  };

  const handleClearFilter = () => {
    column.setFilterValue('');
  };

  const handleFilterByColumn = () => {
    setShowColumnFilters(true);
    setTimeout(() => filterInputRefs.current[`${column.id}-0`]?.focus(), 100);
  };

  const handleShowAllColumns = () => {
    toggleAllColumnsVisible(true);
  };

  const internalColumnMenuItems = (
    <>
      {enableSorting && column.getCanSort() && (
        <>
          {enableSortingRemoval !== false && (
            <Menu.Item
              disabled={!column.getIsSorted()}
              icon={<IconClearAll />}
              onClick={handleClearSort}
            >
              {localization.clearSort}
            </Menu.Item>
          )}
          <Menu.Item
            disabled={column.getIsSorted() === 'asc'}
            icon={<IconSortAscending />}
            onClick={handleSortAsc}
          >
            {localization.sortByColumnAsc?.replace(
              '{column}',
              String(columnDef.header),
            )}
          </Menu.Item>
          <Menu.Item
            icon={<IconSortDescending />}
            disabled={column.getIsSorted() === 'desc'}
            onClick={handleSortDesc}
          >
            {localization.sortByColumnDesc?.replace(
              '{column}',
              String(columnDef.header),
            )}
          </Menu.Item>
          {(enableColumnFilters || enableGrouping || enableHiding) && (
            <Menu.Divider key={3} />
          )}
        </>
      )}
      {enableColumnFilters &&
        columnFilterDisplayMode !== 'popover' &&
        column.getCanFilter() && (
          <>
            <Menu.Item
              disabled={!column.getFilterValue()}
              icon={<IconFilterOff />}
              onClick={handleClearFilter}
            >
              {localization.clearFilter}
            </Menu.Item>
            <Menu.Item icon={<IconFilter />} onClick={handleFilterByColumn}>
              {localization.filterByColumn?.replace(
                '{column}',
                String(columnDef.header),
              )}
            </Menu.Item>
            {(enableGrouping || enableHiding) && <Menu.Divider key={2} />}
          </>
        )}
      {enableGrouping && column.getCanGroup() && (
        <>
          <Menu.Item icon={<IconBoxMultiple />} onClick={handleGroupByColumn}>
            {localization[
              column.getIsGrouped() ? 'ungroupByColumn' : 'groupByColumn'
            ]?.replace('{column}', String(columnDef.header))}
          </Menu.Item>
          {enablePinning && <Menu.Divider />}
        </>
      )}
      {enablePinning && column.getCanPin() && (
        <>
          <Menu.Item
            disabled={column.getIsPinned() === 'left' || !column.getCanPin()}
            icon={<IconPinned style={{ transform: 'rotate(90deg)' }} />}
            onClick={() => handlePinColumn('left')}
          >
            {localization.pinToLeft}
          </Menu.Item>
          <Menu.Item
            disabled={column.getIsPinned() === 'right' || !column.getCanPin()}
            icon={<IconPinned style={{ transform: 'rotate(-90deg)' }} />}
            onClick={() => handlePinColumn('right')}
          >
            {localization.pinToRight}
          </Menu.Item>
          <Menu.Item
            disabled={!column.getIsPinned()}
            icon={<IconPinnedOff />}
            onClick={() => handlePinColumn(false)}
          >
            {localization.unpin}
          </Menu.Item>
          {enableHiding && <Menu.Divider />}
        </>
      )}
      {enableColumnResizing && column.getCanResize() && (
        <Menu.Item
          disabled={!columnSizing[column.id]}
          icon={<IconArrowAutofitContent />}
          key={0}
          onClick={handleResetColumnSize}
        >
          {localization.resetColumnSize}
        </Menu.Item>
      )}
      {enableHiding && (
        <>
          <Menu.Item
            disabled={!column.getCanHide()}
            icon={<IconEyeOff />}
            key={0}
            onClick={handleHideColumn}
          >
            {localization.hideColumn?.replace(
              '{column}',
              String(columnDef.header),
            )}
          </Menu.Item>
          <Menu.Item
            disabled={
              !Object.values(columnVisibility).filter((visible) => !visible)
                .length
            }
            icon={<IconColumns />}
            key={1}
            onClick={handleShowAllColumns}
          >
            {localization.showAllColumns?.replace(
              '{column}',
              String(columnDef.header),
            )}
          </Menu.Item>
        </>
      )}
    </>
  );

  return (
    <Menu closeOnItemClick withinPortal position="bottom-start" styles={{
      item: {
        height: "2rem",
        padding: ".5rem .75rem .5rem .25rem",
        fontSize: "0.875rem",
      },
      itemIcon: {
        height: "1.125rem",
        width: "1.125rem",
        marginRight: ".5rem",
        opacity: 0.75
      },
      label: {

      },
      dropdown: {
        boxShadow: "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.1) 0px 2px 4px -2px",
        padding: 0,
        borderColor: "rgb(229, 229, 229)",
        borderRadius: "6px",
      }
    }}>
      <Tooltip
        withinPortal
        openDelay={0}
        disabled={true}
        label={actionIconProps?.title ?? localization.columnActions}
      >
        <Menu.Target>
          <ActionIcon
            aria-label={localization.columnActions}
            size="sm"
            {...actionIconProps}
            sx={(theme) => ({
              opacity: 0.5,
              transition: 'opacity 100ms',
              '&:hover': {
                opacity: 1,
              },
              ...(actionIconProps?.sx instanceof Function
                ? actionIconProps.sx(theme)
                : (actionIconProps?.sx as any)),
            })}
          >
            <IconChevronDown />
          </ActionIcon>
        </Menu.Target>
      </Tooltip>
      <Menu.Dropdown>
        {columnDef.renderColumnActionsMenuItems?.({
          column,
          table,
          internalColumnMenuItems,
        }) ??
          renderColumnActionsMenuItems?.({
            column,
            table,
            internalColumnMenuItems,
          }) ??
          internalColumnMenuItems}
      </Menu.Dropdown>
    </Menu>
  );
};
