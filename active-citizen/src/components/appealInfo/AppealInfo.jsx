import './appealInfo.css'
import React from 'react'
import empty from './../../img/empty.jpg'
import { YMaps, Map, Placemark } from 'react-yandex-maps'
import DateDisplay from '../../components/dateDisplay/DateDisplay'

function AppealInfo ({appeal, coords, address}) {
    return (
        <div className="appeal-info">
            <div className="appeal-info__item appeal-info__theme">
                <div className="appeal-info__item_label">
                    Тема
                </div>
                <div className="appeal-info__item_value">
                    {appeal.title}
                </div>
            </div>
            <div className="appeal-info__item appeal-info__category">
                <div className="appeal-info__item_label">
                    Категория
                </div>
                <div className="appeal-info__item_value">
                    {appeal.category}                            
                </div>
            </div>
            <div className="appeal-info__item appeal-info__subcategory">
                <div className="appeal-info__item_label">
                    Подкатегория
                </div>
                <div className="appeal-info__item_value">
                    {appeal.subcategory}                            
                </div>
            </div>
            <div className="appeal-info__item appeal-info__datetime">
                <div className="appeal-info__item_label">
                    Дата и время заявки
                </div>
                <div className="appeal-info__item_value">
                    <DateDisplay isoDate={appeal.created_at} />
                </div>
            </div>
            <div className="appeal-info__item appeal-info__desc">
                <div className="appeal-info__item_label">
                    Описание
                </div>
                <div className="appeal-info__item_value appeal-desc__value">
                    {appeal.body}                            
                </div>
            </div>
            <div className="appeal-info__item appeal-info__address">
                <div className="appeal-info__item_label">Адрес</div>
                <div className="map appeal-info__address_value">
                    <div className="map-container">
                        <YMaps>
                            {coords ? (
                                <Map
                                    state={{
                                        center: coords,
                                        zoom: 15,
                                    }}
                                    width="262px"
                                    height="163px"
                                >
                                    <Placemark geometry={coords} />
                                </Map>
                            ) : (
                                <div>Загрузка карты...</div>
                            )}
                        </YMaps>
                    </div>
                    <div className="appeal-info__item_value appeal-address__value">
                        {address}
                    </div>
                </div>
            </div>
            <div className="appeal-info__item appeal-info__images">
                <div className="appeal-info__item_label">
                    Медиафайлы
                </div>
                <div className="appeal-info__item_value appeal__images">
                    <img src={empty} alt="" className='appeal__image' />
                    <img src={empty} alt="" className='appeal__image' />
                    <img src={empty} alt="" className='appeal__image' />
                    <img src={empty} alt="" className='appeal__image' />
                </div>
            </div>
            <div className="appeal-info__item appeal-info__comm">
                <div className="appeal-info__item_label">
                    Комментарии предыдущих модераторов
                </div>
                <div className="appeal-info__item_value appeal-comm__value">
                    <p className='appeal__comm_label'>Комментарий модератора:</p>
                    {appeal.comment}                            
                </div>
            </div>
        </div>
    )
}

export default AppealInfo
