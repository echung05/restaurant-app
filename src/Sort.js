import React from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const Sort = props => {

    const sortByPrice = (list) => {
        const arr = list;
        var len = arr.length;
        for (var i = 0; i < len - 1; i = i + 1) {
            var j_min = i;
            for (var j = i + 1; j < len; j = j + 1) {
                if (arr[j].price_level < arr[j_min].price_level) {
                    j_min = j;
                } else { }
            }
            if (j_min !== i) {
                swap(arr, i, j_min);
            } else { }
        }
        props.setPlaces(arr);
    }

    const sortByRating = (list) => {
        const arr = list;
        var len = arr.length;
        for (var i = 0; i < len - 1; i = i + 1) {
            var j_min = i;
            for (var j = i + 1; j < len; j = j + 1) {
                if (arr[j].rating > arr[j_min].rating) {
                    j_min = j;
                } else { }
            }
            if (j_min !== i) {
                swap(arr, i, j_min);
            } else { }
        }
        props.setPlaces(arr);
    }

    const swap = (arr, x, y) => {
        var temp = arr[x];
        arr[x] = arr[y];
        arr[y] = temp;
    }

    const handleSortChange = (e) => {
        let sortType = e.value;
        if (sortType === 'rating') {
            sortByRating(props.places)
        } else if (sortType === 'prices') {
            sortByPrice(props.places)
        }
        props.update(props.value + 1);
    }

    const options = [
        { value: 'rating', label: "Sort by Highest Rated" },
        { value: 'prices', label: "Sort by Lowest Price" },
    ]
    return (
        <div>
            <Select options={options} onChange={event => handleSortChange(event)} />
        </div>
    );
}
export default Sort;