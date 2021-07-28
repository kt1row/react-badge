import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import { retrieveInfoByCallsign } from '../api/fcc.js'

const Message = (props) => <div className="message">{props.children}</div>

function SayHello({firstName, lastName}) {
  return (
    <div>
      Hello {firstName} {lastName} !
    </div>
  )
}

SayHello.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string,
}


function StockProfile(props) {

  const stockTicker = props.stockTicker;
  const companyProfileInfo = props.companyProfileInfo;
  return (
      <div>
          <div>Profile of: {stockTicker}</div>
          <hr />
          <div>
              {
                  Object.keys(companyProfileInfo)
                      .map((info, index) => {
                          return <div key={index}>{info} : {companyProfileInfo[info]}</div>
                      })
              }
          </div>
      </div>
  );
}

function FBStockProfile() {
  const stockTicker = 'ABC';
  const companyProfileInfo = {
      'Company Name': 'Facebook',
      'Price': 150,
      'Exchange': "Nasdaq Global Select",
      'Industry': "Computer Software",
      'CEO': 'Mark Zuckerberg'
  }

  return (
      <StockProfile stockTicker={stockTicker} companyProfileInfo={companyProfileInfo}/>
  )
}

class HamProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hamProfileInfo: {}
    }
  }

  componentDidMount() {
    retrieveInfoByCallsign(this.props.callsign)
    .then(data => {
      this.setState({
        hamProfileInfo: data
      })
    })
  }

  render() {
    const callsign = this.props.callsign;
    const hamProfileInfo = this.state.hamProfileInfo;

    return (
      <div>
        <div>Profile of: {callsign}</div>
        <hr />
            <div>
            {hamProfileInfo.status}
            <br/>
            {hamProfileInfo.type}
            <br/>
            {hamProfileInfo.name}
            </div>
        </div>
    );
  }
}

const Usage = (props) => {
  return <HamProfile callsign={'KI5KYE'} />
}

export default Usage;
// export const HomePageComponent = () => {

//   return (
//     <div>
//       <Message children="ahoy"/>
//       <SayHello firstName="matt"/>
//       <GetInfo callsign="KI5KYE"/>
//       <FBStockProfile />
//     </div>
    
//   );
// }

// export default HomePageComponent;