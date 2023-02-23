/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Car {
  /** ID */
  pk?: number;
  /**
   * Название модели
   * @minLength 1
   * @maxLength 150
   */
  title: string;
  /** Цена */
  price: number;
  /** Полезный объём */
  capacity: number;
  /**
   * URL фото
   * @minLength 1
   * @maxLength 300
   */
  photo: string;
  /**
   * Марка
   * @minLength 1
   * @maxLength 150
   */
  brand: string;
  /** Грузоподъемность */
  payload: number;
  /**
   * Описание
   * @minLength 1
   * @maxLength 200
   */
  description: string;
}

export interface Order {
  /** ID */
  pk?: number;
  /** Цена */
  price: number;
  /**
   * Адрес получения
   * @minLength 1
   * @maxLength 150
   */
  address_take: string;
  /**
   * Время выдачи
   * @format date-time
   */
  time: string;
  /** Автомобиль id */
  car: number;
  /** Клиент */
  userProfile: number;
  /**
   * Статус
   * @minLength 1
   * @maxLength 30
   */
  status: string;
  /**
   * Водитель
   * @minLength 1
   * @maxLength 30
   */
  driver?: string | null;
  /**
   * Время создания заказа
   * @format date-time
   */
  date_create?: string | null;
  /**
   * Время начала выполнения заказа
   * @format date-time
   */
  date_start?: string | null;
  /**
   * Время завершения заказа
   * @format date-time
   */
  date_end?: string | null;
}

export interface User {
  /** ID */
  pk?: number;
  /** User */
  user: number;
}
