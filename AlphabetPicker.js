import React, { Component, PropTypes } from 'react';
import { View, Text, PanResponder } from 'react-native';


class LetterPicker extends Component {

    render() {
        return (
            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
                {this.props.letter}
            </Text>
        );
    }
}

const Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
export default class AlphabetPicker extends Component {
    constructor(props, context) {
        super(props, context);
        if(props.alphabet){
            Alphabet = props.alphabet;
        }
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: (e, gestureState) => {
                this.props.onTouchStart && this.props.onTouchStart();

                //this.tapTimeout = setTimeout(() => {
                    this._onTouchLetter(this._findTouchedLetter(gestureState.y0));
                //}, 100);
            },
            onPanResponderMove: (evt, gestureState) => {
                //clearTimeout(this.tapTimeout);
                this._onTouchLetter(this._findTouchedLetter(gestureState.moveY));
            },
            onPanResponderTerminate: this._onPanResponderEnd.bind(this),
            onPanResponderRelease: this._onPanResponderEnd.bind(this),
        });
    }

    _onTouchLetter(letter) {
        letter && this.props.onTouchLetter && this.props.onTouchLetter(letter);
    }

    _onPanResponderEnd() {
        requestAnimationFrame(() => {
            this.props.onTouchEnd && this.props.onTouchEnd();
        });
    }

    _findTouchedLetter(y) {
        let top = y - (this.absContainerTop || 0);
        // console.log("top:", top, "containerHeight", this.containerHeight)
        if (top >= 1 && top <= this.containerHeight) {
            // console.log(Alphabet[Math.floor((top / this.containerHeight) * Alphabet.length)])
            return Alphabet[Math.floor((top / this.containerHeight) * Alphabet.length)]
        }
    }

    _onLayout(event) {
        let _measure = ()=>{
            this.refs.alphabetContainer.measure((x1, y1, width, height, px, py) => {
                this.absContainerTop = py;
                this.containerHeight = height;
            });
        }
        typeof setTimeoutBuiltIn == 'undefined' ? setTimeout(_measure, 10) : setTimeoutBuiltIn(_measuer, 10) ;
        
    }

    render() {
        console.log(this.props.renderLetters)
        this._letters = Alphabet.map((letter) => {
                if(this.props.renderLetters) {
                    return this.props.renderLetters(letter)
                } else {
                    return <LetterPicker letter={letter} key={letter} />
                } 
            })
        
        
        //console.log(<LetterPicker letter={"A"} />, this.props.renderLetters("A"))

        return (
            <View
                ref='alphabetContainer'
                {...this._panResponder.panHandlers}
                onLayout={this._onLayout.bind(this)}
                style={[{ paddingHorizontal: 5, backgroundColor: 'transparent', borderRadius: 1, justifyContent: 'center', alignItems: 'center'},
                            this.props.alphabetContainerStyle]}>
                    {this._letters}
            </View>
        );
    }

}
