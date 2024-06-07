// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	declare interface I_Decoded {
		email: string
		userId: string
		userName: string
	}

	declare interface I_Drive {
		_id: string
		root: string
		name: string
		metadata: Record<string, unknown>
		size: number
		owner: string
		permissions: {
			user: string
			scopes: string[]
		}[]
		createdAt: string
		updatedAt: string
	}

	declare interface I_Drives {
		drives: I_Drive[]
	}

	declare interface I_CreateDrive {
		name: string
		metadata?: Record<string, unknown>
		permissions?: {
			user: string
			scopes: string[]
		}[]
	}

	declare interface I_CreateFolderParams {
		parent: string
		name: string
	}

	declare interface I_Blob {
		_id: string
		type: number
		name: string
		drive: string
		parent: string
		size: number
		creator: string
		isDelete: boolean
		metadata: Record<string, unknown>
		shares: string[]
		createdAt: string
		updatedAt: string
	}
}

export {}
