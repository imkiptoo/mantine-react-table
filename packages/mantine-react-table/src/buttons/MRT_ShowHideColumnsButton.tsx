import {type ActionIconProps, Button, Menu} from '@mantine/core';
import {MRT_ShowHideColumnsMenu} from '../menus/MRT_ShowHideColumnsMenu';
import {type HTMLPropsRef, type MRT_TableInstance} from '../types';

interface Props<TData extends Record<string, any> = {}>
	extends ActionIconProps,
		HTMLPropsRef<HTMLButtonElement> {
	table: MRT_TableInstance<TData>;
}

export const MRT_ShowHideColumnsButton = <
	TData extends Record<string, any> = {},
>({table,  ...rest}: Props<TData>) => {
	const {
		options: {
			icons: {IconChevronDown},
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
			itemLabel: {},
			dropdown: {
				boxShadow: "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.1) 0px 2px 4px -2px",
				padding: 0,
				borderColor: "rgb(229, 229, 229)",
				borderRadius: "6px",
			}
		}} closeOnItemClick={false} withinPortal>
			<Menu.Target>
				<Button
					aria-label={localization.showHideColumns}
					variant={"default"}
					rightIcon={<IconChevronDown size={16}/>}
					styles={{
						root: {
							height: "1.75rem",
						},
						label: {
							fontWeight: 400,
						}
					}}
				>
					{rest?.title ?? localization.showHideColumns}
				</Button>
			</Menu.Target>
			<MRT_ShowHideColumnsMenu table={table}/>
		</Menu>
	);
};
