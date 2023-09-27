import { ActionIcon, type ActionIconProps, Menu, Tooltip } from '@mantine/core';
import { MRT_ShowHideColumnsMenu } from '../menus/MRT_ShowHideColumnsMenu';
import { type HTMLPropsRef, type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any> = {}>
  extends ActionIconProps,
    HTMLPropsRef<HTMLButtonElement> {
  table: MRT_TableInstance<TData>;
}

export const MRT_ShowHideColumnsButton = <
  TData extends Record<string, any> = {},
>({
  table,
  ...rest
}: Props<TData>) => {
  const {
    options: {
      icons: { IconColumns },
      localization,
    },
  } = table;

  return (
    <Menu styles={{
      item: {
        height: "2rem",
        padding: ".5rem .75rem .5rem .25rem",
        fontSize: "0.875rem",
        alignSelf: 'center',
        marginTop: ".25rem"
      },
      itemLabel: {

      },
      dropdown: {
        boxShadow: "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.1) 0px 2px 4px -2px",
        padding: 0,
        borderColor: "rgb(229, 229, 229)",
        borderRadius: "6px",
      }
    }} closeOnItemClick={false} withinPortal>
      <Tooltip withinPortal label={rest?.title ?? localization.showHideColumns}>
        <Menu.Target>
          <ActionIcon
            aria-label={localization.showHideColumns}
            size="lg"
            {...rest}
            title={undefined}
          >
            <IconColumns />
          </ActionIcon>
        </Menu.Target>
      </Tooltip>
      <MRT_ShowHideColumnsMenu table={table} />
    </Menu>
  );
};
