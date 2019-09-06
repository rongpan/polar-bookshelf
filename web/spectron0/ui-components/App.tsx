import * as React from 'react';
import {Tags} from '../../js/tags/Tags';
import {AccountUpgradeBarView} from "../../js/ui/account_upgrade/AccountUpgradeBarView";
import {SimpleTabs} from "../../js/ui/simple_tab/SimpleTabs";
import {SimpleTab} from "../../js/ui/simple_tab/SimpleTab";
import {LargeModal} from "../../js/ui/large_modal/LargeModal";
import {LargeModalBody} from "../../js/ui/large_modal/LargeModalBody";
import {GroupHits} from "./group_sharing/GroupHits";
import {GroupHit} from "./group_sharing/GroupHit";
import {NULL_FUNCTION} from "../../js/util/Functions";
import {GroupSearch} from "./group_sharing/GroupSearch";
import {Group} from "../../js/datastore/sharing/db/Groups";
import {ISODateTimeStrings} from "../../js/metadata/ISODateTimeStrings";
import {GroupCard} from "../../../apps/repository/js/groups/GroupCard";
import {LoadingProgress} from "../../js/ui/LoadingProgress";
import {TagInput} from "../../../apps/repository/js/TagInput";
import {RelatedTags} from "../../js/tags/related/RelatedTags";
import {PrefetchedUserGroupsBackgroundListener} from "../../js/datastore/sharing/db/PrefetchedUserGroupsBackgroundListener";
import {TagOption} from "../../../apps/repository/js/TagOption";

const styles = {
    swatch: {
        width: '30px',
        height: '30px',
        float: 'left',
        borderRadius: '4px',
        margin: '0 6px 6px 0',
    }
};

const Folders = () => {
    return <div style={{backgroundColor: 'red', overflow: 'auto'}}>
        these are the folders
    </div>;
};

const Preview = () => {
    return <div style={{backgroundColor: 'orange', overflow: 'auto'}}>
        This is the preview
    </div>;
};


const Main = () => {
    return <div style={{backgroundColor: 'blue'}}>this is the right</div>;
};

class App<P> extends React.Component<{}, IAppState> {

    constructor(props: P, context: any) {
        super(props, context);

    }

    public render() {


        //
        // const root: TNode<TagNode> = {
        //     id: 0,
        //     name: 'CompSci',
        //     children: [
        //         {
        //             id: 1,
        //             name: 'Linux',
        //             children: [],
        //             value: {
        //                 tag: "/CompSci/Linux"
        //             }
        //         },
        //         {
        //             id: 2,
        //             name: 'Google',
        //             children: [
        //                 {
        //                     id: 3,
        //                     name: 'Mountain View',
        //                     children: [],
        //                     value: {
        //                         tag: "/CompSci/Google/Mountain View"
        //                     }
        //                 },
        //                 {
        //                     id: 4,
        //                     name: 'San Francisco',
        //                     children: [],
        //                     value: {
        //                         tag: "/CompSci/Google/San Francisco"
        //                     }
        //                 },
        //             ],
        //             value: {
        //                 tag: "/CompSci/Google"
        //             }
        //
        //         }
        //
        //     ],
        //     value: {
        //         tag: "/CompSci"
        //     }
        // };

        // // const root: TNode<Tag> = TagNodes.create(...tags);
        // Dialogs.prompt({
        //                    title: "Enter the name of a new folder:",
        //                    validator: () => {
        //                        return {message: "it failed dude"};
        //                    },
        //                    onCancel: NULL_FUNCTION,
        //                    onDone: NULL_FUNCTION
        //
        //                });

        const group: Group = {
            nrMembers: 100,
            name: 'Linux',
            description: "A group about Linux, Ubuntu, Debian, and UNIX operating systems.",
            id: "101",
            visibility: 'public',
            created: ISODateTimeStrings.create()
        };

        PrefetchedUserGroupsBackgroundListener.start();

        const relatedTags = new RelatedTags();
        return (

            <div style={{margin: '5px'}}>

                <TagInput availableTags={[]} relatedTags={relatedTags}/>


                <div style={{display: 'flex'}} className="border-top border-top-3 border-primary pt-2">
                    <div style={{
                             verticalAlign: 'top'
                         }}>

                        <button type="button"
                                className="btn btn-primary btn-circle btn-xl">
                            <i className="fas fa-tag"/>

                        </button>

                    </div>

                    <div className="pl-1"
                         style={{
                             verticalAlign: 'top',
                             display: 'flex',
                             flexGrow: 1
                         }}>

                        <div className="mt-2 mb-1">
                            <strong>Assign tags to document:</strong>
                        </div>

                    </div>
                </div>

                {/*<LoadingProgress/>*/}

                {/*<MockFolderTree/>*/}

                {/*<AccountUpgradeBarView plan='free' accountUsage={{storageInBytes: 5000000000}}/>*/}

                {/*<div>*/}

                {/*    /!*<LargeModal isOpen={true}*!/*/}
                {/*    /!*            centered={true}*!/*/}
                {/*    /!*            minWidth="20%">*!/*/}

                {/*    /!*    <LargeModalBody>*!/*/}

                {/*    /!*        this is some modal content.*!/*/}

                {/*    /!*        <GroupSearch/>*!/*/}

                {/*    /!*        <GroupHits>*!/*/}
                {/*    /!*            <GroupHit name="Linux" description="A group about Linux" nrMembers={10} onAdd={NULL_FUNCTION}/>*!/*/}
                {/*    /!*            <GroupHit name="Microsoft" description="A group about Microsoft" nrMembers={5} onAdd={NULL_FUNCTION}/>*!/*/}
                {/*    /!*        </GroupHits>*!/*/}

                {/*    /!*    </LargeModalBody>*!/*/}

                {/*    /!*    /!*<ModalFooter>*!/*!/*/}
                {/*    /!*    /!*    <Button color="primary" onClick={() => this.onDone()}>Close</Button>*!/*!/*/}
                {/*    /!*    /!*</ModalFooter>*!/*!/*/}


                {/*    /!*</LargeModal>*!/*/}


                {/*    <GroupCard group={group}/>*/}

                {/*</div>*/}

                {/*<TreeView root={root}*/}
                {/*          />*/}

                {/*<Dock side="left"*/}
                {/*      left={<Folders/>}*/}
                {/*      right={<Dock side="left"*/}
                {/*                   left={<Preview/>}*/}
                {/*                   right={<Main/>}/>}/>*/}


            </div>

        );
    }


}

export default App;

interface IAppState {

}


