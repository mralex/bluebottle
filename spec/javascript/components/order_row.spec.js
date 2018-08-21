import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import OrderRow from 'components/orders/row';

const coffeesFixture = [{ id: 1, name: 'Test Coffee'}, {id: 2, name: 'Test Coffee 2'}];
const order = {
  id: 99,
  coffee_id: 2,
  brew_method: 'pour_over',
  case_count: 20,
  packets_per_case: 25,
  ship_at: '2018-10-15',
  is_priority: true,
  notes: 'lorem ipsum'
};

describe('OrderRow', () => {
  it("renders values from order object", () => {
    const wrapper = shallow(<OrderRow coffees={coffeesFixture} order={order} />);

    const columns = wrapper.first().children();

    expect(columns).toHaveLength(7);
    expect(columns.at(0).text()).toBe(coffeesFixture[1].name);
    expect(columns.at(1).text()).toBe('Pour Over');
    expect(columns.at(2).text()).toBe(String(order.case_count));
    expect(columns.at(3).text()).toBe(String(order.packets_per_case));
    expect(columns.at(4).text()).toBe('10/15/2018');
  });
});
