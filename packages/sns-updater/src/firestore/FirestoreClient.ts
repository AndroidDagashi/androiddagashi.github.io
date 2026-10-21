import type { Firestore } from 'firebase-admin/firestore'
import { getFirestore } from 'firebase-admin/firestore'
import type { App, ServiceAccount } from 'firebase-admin/app'
import { initializeApp, cert } from 'firebase-admin/app'
import type Milestone from './Milestone'
import type { Sns, SnsPost } from './Milestone'
import { toMilestone } from './Milestone'

const COLLECTION_MILESTONES = 'milestones'

export default class FirestoreClient {
  private readonly firebaseApp: App
  private readonly firestore: Firestore

  constructor(serviceAccount: Record<string, unknown>) {
    const sa = this.parseServiceAccount(serviceAccount)
    this.firebaseApp = initializeApp({ credential: cert(sa) })
    this.firestore = getFirestore(this.firebaseApp)
  }

  private parseServiceAccount(
    serviceAccount: Record<string, unknown>
  ): ServiceAccount {
    return {
      type: serviceAccount.type,
      projectId: serviceAccount.project_id,
      privateKeyId: serviceAccount.private_key_id,
      privateKey: serviceAccount.private_key,
      clientEmail: serviceAccount.client_email,
      clientId: serviceAccount.client_id,
      authUri: serviceAccount.auth_uri,
      tokenUri: serviceAccount.token_uri,
      authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
      clientC509CertUrl: serviceAccount.client_x509_cert_url,
    } as ServiceAccount
  }

  /**
   * Records a post on one SNS. The merge keeps the other SNS's post, so each
   * SNS can be recorded as soon as its own post succeeds.
   */
  async savePost(
    milestone: Pick<Milestone, 'title' | 'number'>,
    sns: Sns,
    post: SnsPost
  ): Promise<void> {
    const result = await this.firestore
      .collection(COLLECTION_MILESTONES)
      .doc(`${milestone.number}`)
      .set(
        {
          title: milestone.title,
          number: milestone.number,
          posts: { [sns]: post },
        },
        { merge: true }
      )

    console.log('saved', result)
  }

  async getMilestone(milestoneNumber: number): Promise<Milestone | null> {
    const ref = await this.firestore
      .collection(COLLECTION_MILESTONES)
      .doc(`${milestoneNumber}`)
      .get()
    const data = ref.data()
    return data == null ? null : toMilestone(data)
  }
}
