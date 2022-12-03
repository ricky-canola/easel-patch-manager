import React from 'react';
import './App.css';
import './styles/colors.css';
import { Easel } from './components/easel';
import store from './store/store';
import { decodePatch, encodePatch, throttle } from './util';
import { dispatchSetPatch, dispatchSetPatchEdited } from './store/dispatch';
import { State } from './store/reducer';
import { connect } from 'react-redux';
import { ModalState } from './types';
import { AppModal } from './components/modals/appModal';

store.subscribe(throttle(() => {
	const state = store.getState();
	const current = state.patch;
	const encoded = encodePatch(current);
	window.location.replace("#" + encoded);

	if (state.saved) {
		const edited = state.saved.patch !== encoded;

		if (!!(state.patchEdited) !== edited) {
			store.dispatch(dispatchSetPatchEdited(edited));
		}
	}
}, 500))

interface AppProps {
	modal?: ModalState
	dispatchSetPatch: (patch: any) => void;
}

const AppImpl = (props: AppProps) => {
	const { modal, dispatchSetPatch } = props;

	React.useEffect(() => {
		const hash = window.location.hash;

		if (hash?.length > 2) {
			const state = decodePatch(hash.slice(1));
			dispatchSetPatch(state);
		}
	}, []);
	
	return (
		<div className="App">
			<Easel />
			{modal && <AppModal />}
		</div>
	);
}

function mapStateToProps(state: State, ownProps: any) {
    if (!state) return {};

    return {
        ...ownProps,
		modal: state.modal
    }
}

const mapDispatchToProps = {
	dispatchSetPatch
};


export default connect(mapStateToProps, mapDispatchToProps)(AppImpl);