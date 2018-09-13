import React from 'react';
import PropTypes from 'prop-types';
import RouterService from 'shared/services/RouterService';
import ItemGoods from 'shared/components/goods/ItemGoods.component';
import PriceItem from 'shared/components/goods/ItemWithPrice.component';

import Wrapper from 'shared/components/wrapper/Wrapper.component';

import ArrowBackIcon from 'assets/svg/arrows.svg';

export default function SingItem(props) {
  const {auth, img, date, title, description, sharedItems} = props.location.state;
  const Item = auth ? PriceItem : ItemGoods;

  return (
    <Wrapper>
      <div className='single-item'>
        <button className="back-btn" onClick={RouterService.goBack}>
          <ArrowBackIcon className="arrow-back-icon"/>
        </button>

        <div className="single-item-wrap">
          <div className="img-container">
            <img src={img} alt="item preview"/>
          </div>

          <p className="start-date">{date.start}</p>

          <h1 className="single-item-title">{title}</h1>

          <p className="description">{description}</p>

          <p className="finish-date">{date.end}</p>

          <div className="single-item-items goods-wrap">
            {
              sharedItems.map((item, key) => {
                return <Item key={key} {...item}/>
              })
            }
          </div>

        </div>

      </div>
    </Wrapper>
  );
}

SingItem.propTypes = {
  location : PropTypes.shape({
    state : PropTypes.shape({
      auth: PropTypes.bool,
      img: PropTypes.string,
      date: PropTypes.shape({
        start: PropTypes.string,
        end: PropTypes.string,
      }),
      title: PropTypes.string,
      description: PropTypes.string,
      sharedItems: PropTypes.array,
    })
  })
};
