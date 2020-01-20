import {DictionaryPrefs, PersistentPrefs, StringToPrefDict} from "../../util/prefs/Prefs";
import {UserPref, UserPrefCallback, UserPrefs} from "./UserPrefs";
import firebase from "../../firebase/lib/firebase";
import {Firestore} from "../../firebase/Firestore";
import {ErrorHandlerCallback, Firebase} from "../../firebase/Firebase";
import {Latch} from "polar-shared/src/util/Latch";
import {NULL_FUNCTION} from "polar-shared/src/util/Functions";
import {SnapshotUnsubscriber} from "../../firebase/SnapshotSubscribers";

export class FirebaseDatastorePrefs extends DictionaryPrefs implements PersistentPrefs {

    private firestore: firebase.firestore.Firestore | undefined;
    private user: firebase.User | undefined;

    private initLatch = new Latch<boolean>();

    constructor(delegate: StringToPrefDict = {}) {
        super(delegate);
    }

    public async init() {

        console.log("FIXME 21");

        const userPref = await UserPrefs.get();

        console.log("FIXME 22");

        this.update(userPref.toPrefDict());

        console.log("FIXME 23");

        this.firestore = await Firestore.getInstance();
        console.log("FIXME 24");
        this.user = (await Firebase.currentUser())!;
        console.log("FIXME 25");

        this.initLatch.resolve(true);

    }

    public onSnapshot(onNext: UserPrefCallback, onError: ErrorHandlerCallback = NULL_FUNCTION): SnapshotUnsubscriber {

        console.log("FIXME 31");

        const snapshotUnsubscriberLatch = new Latch<SnapshotUnsubscriber>();

        const doHandle = async () => {

            console.log("FIXME 32");

            await this.initLatch.get();

            console.log("FIXME 33");

            return UserPrefs.onSnapshot(this.firestore!, this.user!.uid, onNext, onError);

        };

        doHandle().catch(err => onError(err));

        const result = () => {
            snapshotUnsubscriberLatch.get()
                .then(unsubscriber => unsubscriber())
                .catch(err => onError(err));

        };

        return result;
    }

    public async commit(): Promise<void> {
        await UserPrefs.set(this);
    }

    public static toPersistentPrefs(userPref: UserPref | undefined) {

        if (! userPref) {
            return undefined;
        }

        const dictionaryPrefs = new DictionaryPrefs(userPref.value);
        return new FirebaseDatastorePrefs(dictionaryPrefs.toPrefDict());

    }

}
