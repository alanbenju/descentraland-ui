import { mount, configure } from 'enzyme';
import Transfer from '../components/Transfer/Transfer';
import { MemoryRouter as Router } from 'react-router-dom';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import * as React from 'react';

configure({ adapter: new Adapter() });

const mockUseLocationValue = {
    pathname: "/transfer",
    search: '',
    hash: '',
    state: null
}

jest.mock('react-router-dom', () => ({
    ...jest.requireActual("react-router-dom") as {},
    useNavigate: jest.fn().mockImplementation(() => {
        return mockUseLocationValue;
    })
}));


describe('<Transfer />', () => {
    describe('Transfer', () => {
        let component: any;
        let props: any;
        beforeAll(() => {
            props = {
                isConnected: true,
                error: "",
                onTransfer: jest.fn(),
                isTransfering: false,
            }
            component = mount(<Router><Transfer {...props} /></Router>);
        })

        it('Render Transfer connected', () => {
            expect(component.html()).toMatchSnapshot();
        });
        it('Click on transfer without address or amount', () => {
            let clickEvent = () => {
                component.find('button').simulate('click');
            };
            expect(clickEvent).not.toThrow();
            expect(props.onTransfer).not.toBeCalled()
        });
        it('Click on transfer with address and amount', () => {
            const setState = jest.fn();
            const useStateSpy = jest.spyOn(React, 'useState');
            useStateSpy.mockImplementationOnce(() => ["0x123", setState]);
            useStateSpy.mockImplementationOnce(() => [100, setState]);

            props = {
                isConnected: true,
                error: "",
                onTransfer: jest.fn(),
                isTransfering: false,
            }
            component = mount(<Transfer {...props} />);

            let clickEvent = () => {
                component.find('button').simulate('click');
            };
            expect(clickEvent).not.toThrow();
            expect(props.onTransfer).toBeCalled()

        })
    });

});
