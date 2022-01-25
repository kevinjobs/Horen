/*
 * @Author       : Kevin Jobs
 * @Date         : 2022-01-23 19:59:22
 * @LastEditTime : 2022-01-25 16:00:22
 * @lastEditors  : Kevin Jobs
 * @FilePath     : \Horen\packages\horen\types\setting.ts
 * @Description  :
 */
export type SettingItemValue = string | boolean | number | string[] | number[];

export interface SettingItem {
  label: string;
  value: SettingItemValue;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface SettingGroup {
  name: string;
  children: SettingItem[];
}

export interface SettingFile {
  createAt: string | number;
  updateAt: string | number;
  grounps: SettingGroup[];
}