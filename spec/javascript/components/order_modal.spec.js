import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import OrderModal from 'components/order_modal';

let coffeesFixture = [{ id: 1, name: 'Test Coffee'}, { id: 2, name: 'Test Coffee 2'}];

describe('OrderModal', () => {
  it("renders with defaults when there's no order object", () => {
    const wrapper = shallow(<OrderModal coffees={coffeesFixture} />);

    const coffeeIdSelect = wrapper.find('[name="coffee_id"]');
    const brewMethodSelect = wrapper.find('[name="brew_method"]');
    const caseCountInput = wrapper.find('[name="case_count"]');
    const packetsPerCase = wrapper.find('[name="packets_per_case"]');

    expect(coffeeIdSelect.props().value).toBe(coffeesFixture[0].id);
    expect(brewMethodSelect.props().value).toBe('aeropress');
    expect(caseCountInput.props().value).toBe(10);
    expect(packetsPerCase.props().value).toBe(25);
  });

  it("renders values from order object when initialized with one", () => {
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

    const wrapper = shallow(<OrderModal coffees={coffeesFixture} order={order} />);

    const coffeeIdSelect = wrapper.find('[name="coffee_id"]');
    const brewMethodSelect = wrapper.find('[name="brew_method"]');

    const caseCountInput = wrapper.find('[name="case_count"]');
    const packetsPerCase = wrapper.find('[name="packets_per_case"]');

    const notesInput = wrapper.find('[name="notes"]');
    const isPriorityCheckbox = wrapper.find('[name="is_priority"]');

    expect(coffeeIdSelect.props().value).toBe(coffeesFixture[1].id);
    expect(brewMethodSelect.props().value).toBe(order.brew_method);

    expect(caseCountInput.props().value).toBe(order.case_count);
    expect(packetsPerCase.props().value).toBe(order.packets_per_case);

    expect(isPriorityCheckbox.props().checked).toBeTruthy();
    expect(notesInput.props().value).toBe(order.notes);
  });
});
