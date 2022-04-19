import { mount, configure } from 'enzyme';
import Wallet from '../components/Wallet/Wallet';
import { Link, MemoryRouter as Router } from 'react-router-dom';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({adapter: new Adapter()});

const mockUseLocationValue = {
    pathname: "/",
    search: '',
    hash: '',
    state: null
}
jest.mock('react-router-dom', () => ({
    ...jest.requireActual("react-router-dom") as {},
    useLocation: jest.fn().mockImplementation(() => {
        return mockUseLocationValue;
    })
}));

describe('<Wallet />', () => {
    describe('Not connected wallet', () => {
        let component: any;
        let props:any;
        beforeAll(() => {
            props = {
                address: "null",
                balance: 0,
                isConnected: false,
                onConnect: jest.fn(),
                isConnecting: false,
                error: undefined
            }
            component = mount(<Wallet {...props}/>);
        })

        it('Render wallet not connected', () => {
            expect(component.html()).toMatchSnapshot();
        });
        it('Click on connect button', () => {
            let clickEvent = () => {
                component.find('button').simulate('click');
            };
            expect(clickEvent).not.toThrow();
            expect(props.onConnect).toBeCalled()
        });
       
    });
    describe('Connected wallet', () => {
        let component: any;
        let props:any;
        beforeAll(() => {
            props = {
                address: "0x123",
                balance: 100,
                isConnected: true,
                onConnect: jest.fn(),
                isConnecting: false,
                error: "null"
            }
            component = mount(<Router><Wallet {...props}/></Router>);
        })

        it('Render wallet connected', () => {
            expect(component.html()).toMatchSnapshot();
        });
        it('Link to transfer', () => {
            expect(component.find(Link).at(0).props().to).toBe('/transfer');
        });
       
    });
})