import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { App } from '../app';

const TestComponent: React.FC = () => <></>;
const x = 1;

describe('App', () => {
  it('renders App', () => {
    const wrapper = shallow(<App />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
})

describe('App mount', () => {
  beforeAll(() => {
    mount(<TestComponent />);
  });

  test('dummy mount test', () => {
    expect(x).toBe(1);
  })
})