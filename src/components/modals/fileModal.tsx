import * as React from "react";
import { connect } from "react-redux";
import { allPatchesAsync, SavedPatch } from "../../indexedDB";
import { dispatchHideModal, dispatchOpenSavedPatch, dispatchShowSaveModal, dispatchCreateNewPatch } from "../../store/dispatch";
import { State } from "../../store/reducer";
import { formatLastEditedDate } from "../../util";
import { Modal } from "./modal";

import "../../styles/fileModal.css";

export interface FileModalProps {
    dispatchHideModal: () => void;
    dispatchCreateNewPatch: () => void;
    dispatchOpenSavedPatch: (patch: SavedPatch) => void;
    dispatchShowSaveModal: (patch?: SavedPatch) => void;
    patchNotSaved: boolean;
}

export const FileModalImpl = (props: FileModalProps) => {
    const { dispatchHideModal, dispatchOpenSavedPatch, dispatchShowSaveModal, dispatchCreateNewPatch, patchNotSaved } = props;
    const [savedProjects, setSavedProjects] = React.useState<SavedPatch[]>([]);

    React.useEffect(() => {
        allPatchesAsync().then(setSavedProjects)
    }, [])

    const onNewPatchClick = () => {
        dispatchHideModal();
        if (patchNotSaved) {
            dispatchShowSaveModal(undefined);
        }
        else {
            dispatchCreateNewPatch();
        }
    }

    const onPatchClick = (patch: SavedPatch) => {
        dispatchHideModal();
        if (patchNotSaved) {
            dispatchShowSaveModal(patch);
        }
        else {
            dispatchOpenSavedPatch(patch);
        }
    }

    return <Modal
        title="Saved patches"
        onCloseClick={dispatchHideModal}>
        <div className="saved-patches-scroller">
            <div className="saved-patches-list">
                <div className="saved-patch-list-item new-patch" onClick={onNewPatchClick} tabIndex={0} role="button">
                    Create empty patch
                </div>
                {savedProjects.map(patch => 
                    <div key={patch.id} className="saved-patch-list-item" onClick={() => onPatchClick(patch)} tabIndex={0} role="button">
                        <div className="saved-patch-detail">
                            <div className="saved-patch-name">
                                {patch.name}
                            </div>
                            <div className="saved-patch-time">
                                Last edited {formatLastEditedDate(patch.lastSavedTime)}
                            </div>
                        </div>
                        <div className="saved-patch-preview">
                            <img src={patch.preview} alt="Preview of patch" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    </Modal>
}

function mapStateToProps(state: State, ownProps: any) {
    if (!state) return {};

    let patchNotSaved = !state.saved;

    if (state.saved) {
        patchNotSaved = state.patchEdited || state.saved.name !== state.name;
    }

    return {
        ...ownProps,
        patchNotSaved
    }
}

const mapDispatchToProps = {
    dispatchHideModal,
    dispatchOpenSavedPatch,
    dispatchShowSaveModal,
    dispatchCreateNewPatch
};

export const FileModal = connect(mapStateToProps, mapDispatchToProps)(FileModalImpl);