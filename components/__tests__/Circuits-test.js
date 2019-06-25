import React from 'react';
import 'react-native';
import Circuits from '../Circuits';
import renderer from 'react-test-renderer';
import 'isomorphic-fetch';

/* Circuit Renders Test */
test('Renders Test Case - Circuits', () => {
    const snap = renderer.create(<Circuits />).toJSON();
    expect(snap).toMatchSnapshot();
});

// API Test
it('Api Test Case - Circuits', async function () {
     global.fetch = jest.fn().mockImplementation(() => {
        var p = new Promise((resolve, reject) => {
            resolve({
                json: function () {
                    return { circuit_id: 1 }
                }
            })
        })
        return p;
    }) 
    const response = await Circuits.getCircuits();

    expect(response.circuit_id).toBe(1);
})
