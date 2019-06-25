import React from 'react';
import 'react-native';
import Map from '../Map';
import renderer from 'react-test-renderer';
import 'isomorphic-fetch';

/* Map Renders Test */
/* test('Renders Test Case - Map', () => {
    const snap = renderer.create(<Map />).toJSON();
    expect(snap).toMatchSnapshot();
}); */

/* API Test */
it('Api Test Case - Map', async function () {
    global.fetch = jest.fn().mockImplementation(() => {
       var p = new Promise((resolve, reject) => {
           resolve({
               json: function () {
                   return { partner_id: 1 }
               }
           })
       })
       return p;
   }) 
   const response = await Map.getPartners();

   expect(response.partner_id).toBe(1);
})